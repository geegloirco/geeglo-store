package ir.geeglo.dev.store.data.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import ir.geeglo.dev.store.GeegloSpringServiceProvider;
import ir.geeglo.dev.store.data.entity.CartEntity;
import ir.geeglo.dev.store.data.entity.UserEntity;
import org.eclipse.persistence.annotations.Mutable;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.*;

/**
 * @author Mohammad Rahmati, 10/16/2018
 */
@Converter
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
}
