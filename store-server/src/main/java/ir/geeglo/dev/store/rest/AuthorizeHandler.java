package ir.geeglo.dev.store.rest;

import ir.geeglo.dev.store.GeegloSpringServiceProvider;
import ir.geeglo.dev.store.business.KavenegarBusiness;
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

/**
 * @author Mohammad Rahmati, 10/14/2018
 */
@Handler(baseUrl = "authorize", handlerType = HandlerType.METHOD_HANDLER)
public class AuthorizeHandler {
    @MethodHandler(requiredRole = RoleType.GUEST)
    public static PianaResponse init(@SessionParam Session session) {
        Object existance = session.getExistance();
        if (existance instanceof UserEntity) {
            UserEntity userEntity = (UserEntity)existance;

            return new PianaResponse(Status.OK,
                    new ResponseModel(0, new UserModel(
                            userEntity.getUsername(),
                            userEntity.getImage(),
                            session.getSessionKey())));
        }
        return new PianaResponse(Status.OK,
                new ResponseModel(1, session.getSessionKey()));
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
                return new PianaResponse(Status.OK,
                        new ResponseModel(0, new UserModel(
                                userEntity.getUsername(),
                                userEntity.getImage(),
                                session.getSessionKey())));
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
                } else {
                    String hashPass = GeegloSpringServiceProvider.getSecurityBusiness()
                            .encryptDesEcbPkcs5paddingAsBase64(model.getPassword());
                    userEntity.setPassword(hashPass);
                    userService.update(userEntity);
                }
                session.setExistance(userEntity);
                session.setRoleType(RoleType.USER);
                return new PianaResponse(Status.OK,
                        new ResponseModel(0, new UserModel(
                                userEntity.getUsername(),
                                userEntity.getImage(),
                                session.getSessionKey())));
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
        return new PianaResponse(Status.OK,
                new ResponseModel(0, "successful!"));
    }

}
