package ir.geeglo.dev.store.data.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import ir.geeglo.dev.store.GeegloSpringServiceProvider;
import ir.geeglo.dev.store.data.entity.CartEntity;
import ir.geeglo.dev.store.data.entity.UserEntity;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @author Mohammad Rahmati, 10/16/2018
 */
@Converter(autoApply = true)
public class MapConverter implements AttributeConverter<Map, String> {
    private static ObjectMapper objectMapper = new ObjectMapper();
    @Override
    public String convertToDatabaseColumn(Map map) {
        try {
            return objectMapper.writeValueAsString(map);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "{}";
        }
    }

    @Override
    public Map convertToEntityAttribute(String s) {
        try {
            return objectMapper.readValue(s, Map.class);
        } catch (IOException e) {
            e.printStackTrace();
            return new LinkedHashMap();
        }
    }

    public static void main(String[] args) {
//        CartEntity cartEntity = new CartEntity();
//        cartEntity.setCreationTime(new Timestamp(System.currentTimeMillis()));
//        Map map = new LinkedHashMap<>();
//        map.put("count", 1);
//        cartEntity.setItems(map);
//        cartEntity.setUserEntity(GeegloSpringServiceProvider.getUserService().selectByMobile("09391366128"));
//        GeegloSpringServiceProvider.getCartService().save(cartEntity);

        UserEntity userEntity = GeegloSpringServiceProvider.getUserService().selectByMobile("09391366128");
        CartEntity notPaid = GeegloSpringServiceProvider.getCartService().findNotPaid(userEntity);
        notPaid.getItems().remove("1");
        notPaid.getItems().put(1, 2);
        GeegloSpringServiceProvider.getCartService().update(notPaid);
        System.out.println(notPaid);
    }
}
