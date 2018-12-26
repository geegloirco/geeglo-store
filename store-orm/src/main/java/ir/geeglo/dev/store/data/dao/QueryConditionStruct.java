package ir.geeglo.dev.store.data.dao;

import java.util.List;

public class QueryConditionStruct<T> {
    private String field;
    private List<T> filters;
    private FilterType filterType;

    public QueryConditionStruct() {
    }

    public QueryConditionStruct(String field, List<T> filters) {
        this(field, filters, FilterType.IN_LIST);
    }

    public QueryConditionStruct(
            String field,
            List<T> filters,
            FilterType filterType) {
        this.field = field;
        this.filters = filters;
        this.filterType = filterType;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public List<T> getFilters() {
        return filters;
    }

    public void setFilters(List<T> filters) {
        this.filters = filters;
    }

    public FilterType getFilterType() {
        return filterType;
    }

    public void setFilterType(FilterType filterType) {
        this.filterType = filterType;
    }

    public enum FilterType {
        IN_LIST,
        LIKE
    }
}
