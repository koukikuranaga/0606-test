// QuizResultRepository.java
package com.example.quiz.repository;

import com.example.quiz.entity.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {
    
    // ユーザー名で検索
    List<QuizResult> findByUsernameOrderByPlayDateDesc(String username);
    
    // 上位スコア取得
    @Query("SELECT qr FROM QuizResult qr ORDER BY qr.percentage DESC, qr.playDate DESC")
    List<QuizResult> findTopScores();
    
    // 期間内の結果取得
    @Query("SELECT qr FROM QuizResult qr WHERE qr.playDate BETWEEN :startDate AND :endDate ORDER BY qr.playDate DESC")
    List<QuizResult> findByPlayDateBetween(@Param("startDate") LocalDateTime startDate, 
                                          @Param("endDate") LocalDateTime endDate);
    
    // ユーザーの最高スコア取得
    @Query("SELECT qr FROM QuizResult qr WHERE qr.username = :username ORDER BY qr.percentage DESC LIMIT 1")
    QuizResult findTopScoreByUsername(@Param("username") String username);
}