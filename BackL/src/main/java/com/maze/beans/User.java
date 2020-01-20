package com.maze.beans;


import javax.persistence.*;

import com.sun.istack.NotNull;




@Entity
@Table(name="user")
public class User {
	
	
	@Id
	@Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int id;

	public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    
	@NotNull
    @Column(name="nom",nullable=false)
    private String nom;
	
    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

}