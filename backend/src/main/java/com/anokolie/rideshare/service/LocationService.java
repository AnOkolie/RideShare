package com.anokolie.rideshare.service;

import ch.hsr.geohash.GeoHash;
import ch.hsr.geohash.WGS84Point;
import org.springframework.stereotype.Service;

@Service
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
}
