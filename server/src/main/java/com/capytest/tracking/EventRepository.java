package com.capytest.tracking;

import java.time.Instant;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EventRepository extends JpaRepository<Event, Long> {

    record Count(String key, long total) {}

    @Query("select count(e) from Event e where e.type = 'page_view'")
    long countViews();

    @Query("select count(distinct e.visitorId) from Event e")
    long countVisitors();

    @Query("select new com.capytest.tracking.EventRepository$Count(e.payload, count(e)) "
        + "from Event e where e.type = :type group by e.payload order by count(e) desc")
    List<Count> topPayloads(String type, Pageable page);

    @Query("select e from Event e where e.type = 'page_view' and e.createdAt >= :since")
    List<Event> viewsSince(Instant since);
}
