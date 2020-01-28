package com.maze.beans;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
@Entity
@Table(name="score")
public class Score {
	
	
////////////////////
/// INFORMATIONS ///
////////////////////
	@Id
	@Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int id;

	public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }
    
    @Column(name="points")
    private int points;
    
    public int getPoints() {
    	return this.points;    
    	}
    
    public void setPoints(int p) {
    	this.points=p;
    }
    
    
/////////////////////
///   RELATIONS   ///
/////////////////////
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="userId")
    @JsonBackReference
    private User user;
    
    public User getUser() {
    	return this.user;    
    	}
    
    public void setUser(User u) {
    	this.user=u;
    }
    
	

}
