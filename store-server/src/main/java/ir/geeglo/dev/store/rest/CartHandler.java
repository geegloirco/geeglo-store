package ir.geeglo.dev.store.rest;

import com.github.eloyzone.jalalicalendar.DateConverter;
import com.github.eloyzone.jalalicalendar.JalaliDate;
import com.github.eloyzone.jalalicalendar.JalaliDateFormatter;
import ir.geeglo.dev.store.GeegloSpringServiceProvider;
import ir.geeglo.dev.store.data.entity.*;
import ir.geeglo.dev.store.model.ItemModel;
import ir.geeglo.dev.store.model.ResponseModel;
import ir.piana.dev.core.annotation.*;
import ir.piana.dev.core.response.PianaResponse;
import ir.piana.dev.core.role.RoleType;
import ir.piana.dev.core.session.Session;
import ir.piana.dev.secure.random.SecureRandomMaker;
import ir.piana.dev.secure.random.SecureRandomType;

import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Mohammad Rahmati, 10/15/2018
 */
@Handler(baseUrl = "store/cart", handlerType = HandlerType.METHOD_HANDLER)
public class CartHandler {
    @MethodHandler(requiredRole = RoleType.GUEST)
    public static PianaResponse getCartItems(@SessionParam Session session) {
        CartEntity cartEntity = (CartEntity) session.getObject("cart");
        return new PianaResponse(Response.Status.OK,
                new ResponseModel(0, cartEntity.getHistory()));
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
//        cartEntity.setItems(cartEntity.getItems());
        if(cartEntity.getUserId() != 0) {
            GeegloSpringServiceProvider.getOpenCartService().update(cartEntity);
        }
        return new PianaResponse(Response.Status.OK,
                new ResponseModel(0, itemModel));
    }

    @MethodHandler(requiredRole = RoleType.USER)
    @Path("register-cart")
    public static PianaResponse registerCart(
            @SessionParam Session session,
            @MapParam Map<String, List<String>> map) {
        OpenCartEntity openCartEntity = (OpenCartEntity) session.getObject("cart");
        CartEntity cartEntity = new CartEntity();
        UserEntity existance = (UserEntity) session.getExistance();
        cartEntity.setUserEntity(existance);
        Map<String, Object> history = new LinkedHashMap<>();

        final Integer[] totalPrice = new Integer[1];
        totalPrice[0] = 0;

        List items = new ArrayList<>();
        openCartEntity.getItems().keySet().forEach(key -> {
            Object o = openCartEntity.getItems().get((String) key);
            if(o instanceof ItemModel) {
                int count = ((ItemModel)o).getCount();
                int price = ((ItemModel)o).getPrice();
            } else {
                int count = (Integer) ((LinkedHashMap)o).get("count");
                int price = (Integer) ((LinkedHashMap)o).get("price");
                totalPrice[0] += count * price;
            }
            items.add(o);
        });
        history.put("items", items);
        history.put("total-price", totalPrice[0]);

        AddressEntity address = (AddressEntity)GeegloSpringServiceProvider.getAddressService()
                .findById(Integer.parseInt(map.get("addressId").get(0)));
        history.put("address", address);
        history.put("address-title", address.getTitle());

        PaymentTypeEntity paymentType = (PaymentTypeEntity) GeegloSpringServiceProvider
                .getPaymentTypeService().findById(
                        Integer.parseInt(map.get("paymentTypeId").get(0)));
        history.put("payment-type", paymentType);
        history.put("payment-type-title", paymentType.getTitle());

        DateConverter dateConverter = new DateConverter();
        JalaliDate jalaliDate = dateConverter.nowAsJalali();
        history.put("register-date", jalaliDate.format(new JalaliDateFormatter(
                "yyyy/mm/dd", JalaliDateFormatter.FORMAT_IN_PERSIAN)));

        try {
            long l = SecureRandomMaker.makeLong(SecureRandomType.SHA_1_PRNG);
            l = l < 0? l * -1 : l;
            String r = String.valueOf(l);
            if(r.length() > 10)
                r = r.substring(0, 10);
            cartEntity.setReferenceId(String.valueOf(r));
        } catch (Exception e) {
            e.printStackTrace();
        }
        cartEntity.setHistory(history);
        cartEntity.setCreationTime(openCartEntity.getCreationTime());
        cartEntity.setRegisterTime(new Timestamp(System.currentTimeMillis()));

        existance.addCartEntity(cartEntity);
        GeegloSpringServiceProvider.getCartService().save(cartEntity);
        GeegloSpringServiceProvider.getUserService().update(existance);

        openCartEntity.setItems(new LinkedHashMap());
        openCartEntity.setCreationTime(new Timestamp(System.currentTimeMillis()));
        GeegloSpringServiceProvider.getOpenCartService().update(openCartEntity);
        return new PianaResponse(Response.Status.OK,
                new ResponseModel(0, openCartEntity));
    }

    @MethodHandler(requiredRole = RoleType.USER)
    @Path("history")
    public static PianaResponse getCartHistory(@SessionParam Session session) {
        UserEntity userEntity = (UserEntity) session.getExistance();
        userEntity.getCartEntities().sort((c1, c2) -> {
         return c1.getId() > c2.getId() ? 1 : -1;
        });

        return new PianaResponse(Response.Status.OK,
                new ResponseModel(0, userEntity.getCartEntities()));
    }
}
