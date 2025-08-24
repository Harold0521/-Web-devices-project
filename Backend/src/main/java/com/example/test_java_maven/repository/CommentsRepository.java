package com.example.test_java_maven.repository;

import com.example.test_java_maven.model.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

public interface CommentsRepository extends JpaRepository<Comments, Long> {
    List<Comments> findByDevice_Id(Long deviceId);
}
