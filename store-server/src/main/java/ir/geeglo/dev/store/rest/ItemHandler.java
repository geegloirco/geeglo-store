package ir.geeglo.dev.store.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import ir.geeglo.dev.store.model.ItemModel;
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
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Mohammad Rahmati, 10/15/2018
 */
@Handler(baseUrl = "store/item", handlerType = HandlerType.METHOD_HANDLER)
public class ItemHandler {
    @MethodHandler(requiredRole = RoleType.GUEST)
    public static PianaResponse getItems(@SessionParam Session session) {
        List<ItemModel> models = new ArrayList<>();
        models.add(new ItemModel(1, "کالای 1", 2, 1000, "goods.png"));
        models.add(new ItemModel(2, "کالای 2", 3, 1000,"goods.png"));
        models.add(new ItemModel(3, "کالای 3", 4, 1000,"goods.png"));
        models.add(new ItemModel(4, "کالای 4", 2, 1000,"goods.png"));
        models.add(new ItemModel(5, "کالای 5", 1, 1000,"goods.png"));
        return new PianaResponse(Response.Status.OK,
                new ResponseModel(0, models));
    }

    @MethodHandler(requiredRole = RoleType.GUEST)
    @Path("count")
    public static PianaResponse decrement(@SessionParam Session session,
                                          @QueryParam("id") int id, int count) {
        Object cart = session.getObject("cart");
        Map cartMap = null;
        if(cart == null) {
            cartMap = new LinkedHashMap();
        } else
            cartMap = (Map)cart;

        cartMap.put(id, count);
        session.setObject("cart", cartMap);
        return new PianaResponse(Response.Status.OK,
                new ResponseModel(0, count));
    }
}
