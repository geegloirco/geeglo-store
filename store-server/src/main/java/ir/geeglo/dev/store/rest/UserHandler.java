package ir.geeglo.dev.store.rest;

import ir.geeglo.dev.store.GeegloSpringServiceProvider;
import ir.geeglo.dev.store.business.KavenegarBusiness;
import ir.geeglo.dev.store.data.entity.AddressEntity;
import ir.geeglo.dev.store.data.entity.OpenCartEntity;
import ir.geeglo.dev.store.data.entity.UserEntity;
import ir.geeglo.dev.store.data.entity.UserInfoEntity;
import ir.geeglo.dev.store.data.service.UserService;
import ir.geeglo.dev.store.model.ResponseModel;
import ir.geeglo.dev.store.model.UserInfoModel;
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
import java.util.Map;

/**
 * @author Mohammad Rahmati, 10/14/2018
 */
@Handler(baseUrl = "user", handlerType = HandlerType.METHOD_HANDLER)
public class UserHandler {
    @MethodHandler(requiredRole = RoleType.USER)
    public static PianaResponse getUserInfo(@SessionParam Session session) {
        System.out.println("in user");
        System.out.println(session.getExistance());
        System.out.println(session.getExistance() instanceof UserEntity);
        UserEntity userEntity = (UserEntity) session.getExistance();
        UserInfoModel userInfoModel = new UserInfoModel(userEntity);
        return new PianaResponse(Status.OK,
                new ResponseModel(0, userInfoModel));
    }

    @MethodHandler(requiredRole = RoleType.USER, httpMethod = "PUT")
    public static PianaResponse updateUserInfo(
            @SessionParam Session session,
            @BodyObjectParam UserInfoModel model) {
        UserEntity userEntity = (UserEntity) session.getExistance();
        UserInfoEntity userInfo = userEntity.getUserInfos().get(0);
        userInfo.setFirstName(model.getFirstName());
        userInfo.setLastName(model.getLastName());
        userInfo.setNationalCode(model.getNationalCode());
        GeegloSpringServiceProvider.getOrmServiceProvider()
                .getUserService().update(userEntity);
        return new PianaResponse(Status.OK,
                new ResponseModel(0, model));
    }
}
