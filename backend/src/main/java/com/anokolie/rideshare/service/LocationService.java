package com.anokolie.rideshare.service;

import ch.hsr.geohash.GeoHash;
import ch.hsr.geohash.WGS84Point;
import lombok.AllArgsConstructor;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LocationService {
    public GeoHash getGeoHash(String geoHash){
        return GeoHash.fromGeohashString(geoHash);
    }
    public double getLatitude(String geo){
        GeoHash geoHash = getGeoHash(geo); //

        WGS84Point point = geoHash.getOriginatingPoint();

        return point.getLatitude();
    }

    public double getLongitude(String geo){
        GeoHash geoHash = getGeoHash(geo);
        WGS84Point point = geoHash.getOriginatingPoint();
        return point.getLongitude();
    }
    public Point toPoint(Double lat, Double lng){
        return new Point(lat,lng);
    }
}
