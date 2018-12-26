package ir.geeglo.dev.store.rest;

import ir.geeglo.dev.store.GeegloSpringServiceProvider;
import ir.geeglo.dev.store.data.entity.ItemGroupEntity;
import ir.geeglo.dev.store.model.ResponseModel;
import ir.piana.dev.core.annotation.Handler;
import ir.piana.dev.core.annotation.HandlerType;
import ir.piana.dev.core.annotation.MethodHandler;
import ir.piana.dev.core.annotation.SessionParam;
import ir.piana.dev.core.response.PianaResponse;
import ir.piana.dev.core.role.RoleType;
import ir.piana.dev.core.session.Session;

import javax.ws.rs.core.Response;
import java.util.List;

/**
 * @author Mohammad Rahmati, 10/15/2018
 */
@Handler(baseUrl = "store/item-group", handlerType = HandlerType.METHOD_HANDLER)
public class ItemGroupHandler {
    @MethodHandler(requiredRole = RoleType.GUEST)
    public static PianaResponse getItemGroups(
            @SessionParam Session session) {
        List<ItemGroupEntity> groupEntities = GeegloSpringServiceProvider
                .getOrmServiceProvider().getItemGroupService().findEntities();
        return new PianaResponse(Response.Status.OK,
                new ResponseModel(0, groupEntities));
    }
}
