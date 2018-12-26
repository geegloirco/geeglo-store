package ir.geeglo.dev.store.rest;

import ir.geeglo.dev.store.GeegloSpringServiceProvider;
import ir.geeglo.dev.store.data.entity.CartEntity;
import ir.geeglo.dev.store.data.entity.ItemEntity;
import ir.geeglo.dev.store.data.entity.OpenCartEntity;
import ir.geeglo.dev.store.data.entity.UserEntity;
import ir.geeglo.dev.store.model.ItemModel;
import ir.geeglo.dev.store.model.ResponseModel;
import ir.piana.dev.core.annotation.*;
import ir.piana.dev.core.response.PianaResponse;
import ir.piana.dev.core.role.RoleType;
import ir.piana.dev.core.session.Session;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Mohammad Rahmati, 10/15/2018
 */
@Handler(baseUrl = "store/payment-type", handlerType = HandlerType.METHOD_HANDLER)
public class PaymentTypeHandler {
    static List entities = null;

    static {
        entities = GeegloSpringServiceProvider.getOrmServiceProvider()
                .getPaymentTypeService().findEntities();
    }

    @MethodHandler(requiredRole = RoleType.GUEST)
    public static PianaResponse getPaymentTypes(@SessionParam Session session) {
        return new PianaResponse(Response.Status.OK,
                new ResponseModel(0, entities));
    }
}
