package ir.geeglo.dev.store.rest;

import ir.geeglo.dev.store.GeegloSpringServiceProvider;
import ir.geeglo.dev.store.business.KavenegarBusiness;
import ir.geeglo.dev.store.data.entity.CartEntity;
import ir.geeglo.dev.store.data.entity.OpenCartEntity;
import ir.geeglo.dev.store.data.entity.UserEntity;
import ir.geeglo.dev.store.data.entity.UserInfoEntity;
import ir.geeglo.dev.store.data.service.UserService;
import ir.geeglo.dev.store.model.ResponseModel;
import ir.geeglo.dev.store.model.UserLoginInfoModel;
import ir.geeglo.dev.store.model.UserModel;
import ir.piana.dev.core.annotation.*;
import ir.piana.dev.core.response.PianaResponse;
import ir.piana.dev.core.role.RoleType;
import ir.piana.dev.core.session.Session;

import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response.Status;
import java.sql.Timestamp;
import java.util.LinkedHashMap;

/**
 * @author Mohammad Rahmati, 10/14/2018
 */
@Handler(baseUrl = "authorize", handlerType = HandlerType.METHOD_HANDLER)
public class AuthorizeHandler {
    @MethodHandler(requiredRole = RoleType.GUEST)
    public static PianaResponse init(@SessionParam Session session) {
        Object existance = session.getExistance();
        if (existance != null && existance instanceof UserEntity) {
            UserEntity userEntity = (UserEntity) existance;
            OpenCartEntity cartEntity = setSessionCartAfterLogin(session, userEntity.getId());
            return new PianaResponse(Status.OK,
                    new ResponseModel(0, new UserModel(
                            userEntity.getUsername(),
                            userEntity.getImage(),
                            session.getSessionKey(),
                            cartEntity.getItems())));
        }else {
            OpenCartEntity cartEntity = createCartEntityIfNotExist(session);
            return new PianaResponse(Status.OK,
                    new ResponseModel(1, new UserModel(null, null,
                            session.getSessionKey(), cartEntity.getItems())));
        }
    }

    @MethodHandler(requiredRole = RoleType.GUEST, httpMethod = "POST")
    @Path("login")
    public static PianaResponse login(@BodyObjectParam UserLoginInfoModel model,
                                      @SessionParam Session session) throws Exception {
        UserEntity userEntity = GeegloSpringServiceProvider.getUserService()
                .selectByMobile(model.getUsername());
        if(userEntity != null && userEntity.getPassword() != null) {
            String hashPass = GeegloSpringServiceProvider.getSecurityBusiness()
                    .encryptDesEcbPkcs5paddingAsBase64(model.getPassword());
            if (userEntity.getPassword()
                    .equalsIgnoreCase(hashPass)) {
                session.setExistance(userEntity);
                session.setRoleType(RoleType.USER);

                OpenCartEntity cartEntity = setSessionCartAfterLogin(session, userEntity.getId());

                return new PianaResponse(Status.OK,
                        new ResponseModel(0, new UserModel(
                                userEntity.getUsername(),
                                userEntity.getImage(),
                                session.getSessionKey(),
                                cartEntity.getItems())));
            }
        }

        return new PianaResponse(Status.OK,
                new ResponseModel(1, "not correct"));
    }

    @MethodHandler(requiredRole = RoleType.GUEST, httpMethod = "POST")
    @Path("register")
    public static PianaResponse register(@SessionParam Session session,
                                    @BodyObjectParam UserLoginInfoModel model) {
        KavenegarBusiness kavenegarBusiness = GeegloSpringServiceProvider.getKavenegarBusiness();
        String otp = kavenegarBusiness.sendOtp(model.getUsername());
//        String otp = "123";
        session.setExistance(model);
        session.setRoleType(RoleType.USER);
        session.setString("otp", otp);

        return new PianaResponse(Status.OK,
                new ResponseModel(0, session.getSessionKey()));
    }

    @MethodHandler(requiredRole = RoleType.GUEST, httpMethod = "POST")
    @Path("verify")
    public static PianaResponse verify(@SessionParam Session session,
                                    @QueryParam("otp") String otp) throws Exception {
        String otp1 = session.getString("otp");
        if(otp.equalsIgnoreCase(otp1)) {
            Object existance = session.getExistance();
            if(existance instanceof UserLoginInfoModel) {
                UserService userService = GeegloSpringServiceProvider.getUserService();
                UserLoginInfoModel model = (UserLoginInfoModel)existance;
                UserEntity userEntity = userService.selectByMobile(model.getUsername());
                OpenCartEntity cartEntity = null;
                if(userEntity == null) {
                    userEntity = new UserEntity();
                    userEntity.setMobile(model.getUsername());
                    userEntity.setUsername(model.getUsername());
                    userEntity.setImage("customer.png");
                    String hashPass = GeegloSpringServiceProvider.getSecurityBusiness()
                            .encryptDesEcbPkcs5paddingAsBase64(model.getPassword());
                    userEntity.setPassword(hashPass);

                    userEntity.setEnterDate(new Timestamp(System.currentTimeMillis()));
                    userService.save(userEntity, new UserInfoEntity());

                    cartEntity = (OpenCartEntity) session.getObject("cart");
                    cartEntity.setUserId(userEntity.getId());
                    GeegloSpringServiceProvider.getOpenCartService().save(cartEntity);
                } else {
                    String hashPass = GeegloSpringServiceProvider.getSecurityBusiness()
                            .encryptDesEcbPkcs5paddingAsBase64(model.getPassword());
                    userEntity.setPassword(hashPass);
                    userService.update(userEntity);
                    OpenCartEntity byUserId = GeegloSpringServiceProvider.getOpenCartService().findByUserId(userEntity.getId());
                    cartEntity = setSessionCartAfterLogin(session, byUserId);
                }
                session.setExistance(userEntity);
                session.setRoleType(RoleType.USER);
                return new PianaResponse(Status.OK,
                        new ResponseModel(0, new UserModel(
                                userEntity.getUsername(),
                                userEntity.getImage(),
                                session.getSessionKey(),
                                cartEntity.getItems())));
            }
        }
        return new PianaResponse(Status.OK,
                new ResponseModel(1, "not correct"));
    }

    @MethodHandler(requiredRole = RoleType.USER, httpMethod = "POST")
    @Path("logout")
    public static PianaResponse logout(@SessionParam Session session) {
        session.setExistance(null);
        session.setRoleType(RoleType.GUEST);
        OpenCartEntity cartEntity = new OpenCartEntity();
        cartEntity.setCreationTime(new Timestamp(System.currentTimeMillis()));
        cartEntity.setUserId(0);
        cartEntity.setItems(new LinkedHashMap());
        session.setObject("cart", cartEntity);
        return new PianaResponse(Status.OK,
                new ResponseModel(0, new UserModel(null, null,
                        session.getSessionKey(), cartEntity.getItems())));
    }

    private static OpenCartEntity createCartEntityIfNotExist(Session session) {
        Object cart = session.getObject("cart");
        if (cart == null) {
            OpenCartEntity cartEntity = new OpenCartEntity();
            cartEntity.setCreationTime(new Timestamp(System.currentTimeMillis()));
            cartEntity.setItems(new LinkedHashMap());
            session.setObject("cart", cartEntity);
            return cartEntity;
        }
        return (OpenCartEntity)cart;
    }

    public static OpenCartEntity setSessionCartAfterLogin(Session session, int userId) {
        OpenCartEntity cartEntity = GeegloSpringServiceProvider
                .getOpenCartService().findByUserId(userId);
        setSessionCartAfterLogin(session, cartEntity);
        return cartEntity;
    }

    public static OpenCartEntity setSessionCartAfterLogin(Session session, OpenCartEntity cartEntity) {
        OpenCartEntity cart = (OpenCartEntity)session.getObject("cart");
        if(cart.getItems().size() > 0) {
            cartEntity.setItems(cart.getItems());
            GeegloSpringServiceProvider.getCartService().update(cartEntity);
        }
        session.setObject("cart", cartEntity);
        return cartEntity;
    }
}
