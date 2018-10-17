package ir.geeglo.dev.store.rest;

import ir.geeglo.dev.store.GeegloSpringServiceProvider;
import ir.geeglo.dev.store.data.entity.CartEntity;
import ir.geeglo.dev.store.data.entity.ItemEntity;
import ir.geeglo.dev.store.model.ResponseModel;
import ir.piana.dev.core.annotation.Handler;
import ir.piana.dev.core.annotation.HandlerType;
import ir.piana.dev.core.annotation.MethodHandler;
import ir.piana.dev.core.annotation.SessionParam;
import ir.piana.dev.core.response.PianaResponse;
import ir.piana.dev.core.role.RoleType;
import ir.piana.dev.core.session.Session;

import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import java.util.List;

/**
 * @author Mohammad Rahmati, 10/15/2018
 */
@Handler(baseUrl = "store/cart", handlerType = HandlerType.METHOD_HANDLER)
public class CartHandler {
    @MethodHandler(requiredRole = RoleType.GUEST)
    public static PianaResponse getCartItems(@SessionParam Session session) {
        CartEntity cartEntity = (CartEntity) session.getObject("cart");
        return new PianaResponse(Response.Status.OK,
                new ResponseModel(0, cartEntity.getItems()));
    }

    @MethodHandler(requiredRole = RoleType.GUEST)
    @Path("change-cart")
    public static PianaResponse changeCart(@SessionParam Session session,
                                          @QueryParam("id") int id,
                                          @QueryParam("count") int count) {
        CartEntity cartEntity = (CartEntity) session.getObject("cart");
        cartEntity.getItems().put(String.valueOf(id), count);
        if(cartEntity.getUserEntity() != null)
            GeegloSpringServiceProvider.getCartService().update(cartEntity);
        return new PianaResponse(Response.Status.OK,
                new ResponseModel(0, cartEntity.getItems().get(String.valueOf(id))));
    }
}
