package ir.geeglo.dev.store.rest;

import ir.geeglo.dev.store.GeegloSpringServiceProvider;
import ir.geeglo.dev.store.data.entity.CartEntity;
import ir.geeglo.dev.store.data.entity.OpenCartEntity;
import ir.geeglo.dev.store.data.entity.UserEntity;
import ir.geeglo.dev.store.model.ItemModel;
import ir.geeglo.dev.store.model.ResponseModel;
import ir.piana.dev.core.annotation.*;
import ir.piana.dev.core.response.PianaResponse;
import ir.piana.dev.core.role.RoleType;
import ir.piana.dev.core.session.Session;

import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import java.sql.Timestamp;
import java.util.LinkedHashMap;

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

    @MethodHandler(requiredRole = RoleType.GUEST, httpMethod = "POST")
    @Path("change-cart")
    public static PianaResponse changeCart(@SessionParam Session session,
                                           @BodyObjectParam ItemModel itemModel) {
        OpenCartEntity cartEntity = (OpenCartEntity) session.getObject("cart");
        if(itemModel.getCount() == 0)
            cartEntity.getItems().remove(String.valueOf(itemModel.getId()));
        else
            cartEntity.getItems().put(String.valueOf(itemModel.getId()), itemModel);
        cartEntity.setItems(cartEntity.getItems());
        if(cartEntity.getUserId() != 0) {
            GeegloSpringServiceProvider.getOpenCartService().update(cartEntity);
        }
        return new PianaResponse(Response.Status.OK,
                new ResponseModel(0, itemModel));
    }

    @MethodHandler(requiredRole = RoleType.USER)
    @Path("register-cart")
    public static PianaResponse registerCart(@SessionParam Session session) {
        OpenCartEntity openCartEntity = (OpenCartEntity) session.getObject("cart");
        CartEntity cartEntity = new CartEntity(openCartEntity);
        UserEntity existance = (UserEntity) session.getExistance();
        existance.addCartEntity(cartEntity);

        GeegloSpringServiceProvider.getCartService().save(cartEntity);
        openCartEntity.setItems(new LinkedHashMap());
        openCartEntity.setCreationTime(new Timestamp(System.currentTimeMillis()));
        GeegloSpringServiceProvider.getOpenCartService().update(openCartEntity);
        return new PianaResponse(Response.Status.OK,
                new ResponseModel(0, openCartEntity));
    }
}
