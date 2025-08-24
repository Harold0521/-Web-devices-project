package com.example.test_java_maven.repository;

import com.example.test_java_maven.model.Devices;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DevicesRepository extends JpaRepository<Devices, Long> {
    
}
