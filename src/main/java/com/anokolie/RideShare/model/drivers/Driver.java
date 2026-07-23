package com.anokolie.RideShare.model.drivers;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import org.locationtech.jts.geom.Point;
import com.anokolie.RideShare.model.drivers.status;

@Entity
@Table(name = "events")
public class Driver {
    @id @Getter @Setter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Getter @Setter @Column(nullable = false)
    private String name;
    @Getter @Setter @Column(nullable = false)
    private status status = com.anokolie.RideShare.model.drivers.status.OFFLINE;
    @Getter @Setter @Column(columnDefinition = "POINT SRID 4326")
    private Point location;
    @Getter @Setter @Column(nullable = false, columnDefinition = "integer default 0")
    private int version = 0;
    @CreationTimestamp
    @Column(name = "last_heartbeat", nullable = false)
    @Getter @Setter
    private LocalDateTime last_heartbeat;

}
