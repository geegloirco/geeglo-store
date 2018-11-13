package ir.geeglo.dev.store.rest;

import ir.geeglo.dev.store.data.entity.CartEntity;
import ir.geeglo.dev.store.data.entity.ItemEntity;
import ir.geeglo.dev.store.data.entity.ItemGroupEntity;
import ir.geeglo.dev.store.model.ResponseModel;
import ir.piana.dev.core.annotation.*;
import ir.piana.dev.core.response.PianaResponse;
import ir.piana.dev.core.role.RoleType;
import ir.piana.dev.core.session.Session;

import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Map;

import static ir.geeglo.dev.store.GeegloSpringServiceProvider.*;

/**
 * @author Mohammad Rahmati, 10/15/2018
 */
@Handler(baseUrl = "store/item-group", handlerType = HandlerType.METHOD_HANDLER)
public class ItemGroupHandler {
    @MethodHandler(requiredRole = RoleType.GUEST)
    public static PianaResponse getItemGroups(
            @SessionParam Session session) {
        List<ItemGroupEntity> groupEntities = getItemGroupService().findEntities();
        return new PianaResponse(Response.Status.OK,
                new ResponseModel(0, groupEntities));
    }
}
