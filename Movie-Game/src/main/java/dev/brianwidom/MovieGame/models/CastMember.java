package dev.brianwidom.MovieGame.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@AllArgsConstructor
@Builder
@ToString
public class CastMember {
    private int id;
    private String name;
    private String character;
    @Override
    public boolean equals(Object o){
        return this.name.equals( ((CastMember)o).name);
    }
}
