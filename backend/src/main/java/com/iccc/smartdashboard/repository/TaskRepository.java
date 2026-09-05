package com.iccc.smartdashboard.repository;

import com.iccc.smartdashboard.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByAssignedToIdAndStatusIn(Long assignedToId, List<String> statuses);
    List<Task> findByAssignedToId(Long assignedToId);
}
