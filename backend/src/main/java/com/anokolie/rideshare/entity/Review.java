package com.anokolie.rideshare.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="reviews")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Review {


    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;



    @ManyToOne
    @JoinColumn(name="trip_id")
    private Trip trip;



    @ManyToOne
    @JoinColumn(name="reviewer_id")
    private User reviewer;



    @ManyToOne
    @JoinColumn(name="reviewee_id")
    private User reviewee;



    private Integer stars;


    @Column(columnDefinition="TEXT")
    private String comment;



    private LocalDateTime createdAt;
}