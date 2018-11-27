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
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

/**
 * @author Mohammad Rahmati, 10/15/2018
 */
@Handler(baseUrl = "store/cart", handlerType = HandlerType.METHOD_HANDLER)
public class CartHandler {
    private static final DateConverter dateConverter = new DateConverter();
    private static final SimpleDateFormat simpleDateFormat = new SimpleDateFormat("MMddhhmmss");

    @MethodHandler(requiredRole = RoleType.GUEST)
    public static PianaResponse getCartItems(@SessionParam Session session) {
        CartEntity cartEntity = (CartEntity) session.getObject("cart");
        return new PianaResponse(Response.Status.OK,
                new ResponseModel(0, cartEntity.getCartDetailEntities().get(0).getHistory()));
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
        CartDetailEntity cartDetailEntity = new CartDetailEntity();
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
                totalPrice[0] += count * price;
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
        cartEntity.setAddressTitle(address.getTitle());

        PaymentTypeEntity paymentType = (PaymentTypeEntity) GeegloSpringServiceProvider
                .getPaymentTypeService().findById(
                        Integer.parseInt(map.get("paymentTypeId").get(0)));
        cartEntity.setPaymentType(paymentType);
        cartEntity.setPaymentTypeTitle(paymentType.getTitle());
        history.put("payment-type", paymentType);
        history.put("payment-type-title", paymentType.getTitle());


        JalaliDate jalaliDate = dateConverter.nowAsJalali();
        String registerDate = jalaliDate.format(new JalaliDateFormatter(
                "yyyy/mm/dd", JalaliDateFormatter.FORMAT_IN_PERSIAN));
        cartEntity.setRegisterDate(registerDate);
        cartEntity.setTotalPrice(totalPrice[0]);

        history.put("register-date", registerDate);
        history.put("delivery-date", "");
        DeliveryStatusEntity deliveryStatusEntity = (DeliveryStatusEntity)GeegloSpringServiceProvider
                .getDeliveryStatusService().findById(1);
        cartEntity.setDeliveryStatusEntity(deliveryStatusEntity);

        try {
            String refNo = simpleDateFormat.format(new Date());
            cartEntity.setReferenceNo(refNo);
            cartDetailEntity.setReferenceNo(refNo);
        } catch (Exception e) {
            e.printStackTrace();
        }
        cartDetailEntity.setHistory(history);
        cartEntity.setCreationTime(openCartEntity.getCreationTime());
        cartEntity.setRegisterTime(new Timestamp(System.currentTimeMillis()));

        existance.addCartEntity(cartEntity);
        cartEntity.addCartDetailEntity(cartDetailEntity);
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

    @MethodHandler(requiredRole = RoleType.USER)
    @Path("history/detail")
    public static PianaResponse getCartDetail(@SessionParam Session session,
                                              @QueryParam("cartId") int cartId) {
        UserEntity userEntity = (UserEntity) session.getExistance();
        CartEntity cartEntity = (CartEntity)GeegloSpringServiceProvider.getCartService().findById(cartId);
        return new PianaResponse(Response.Status.OK,
                new ResponseModel(0, cartEntity.getCartDetailEntities().get(0).getHistory()));
    }
}
