package com.ProjetoSegundoBimestre.Petshop.repository;

import com.ProjetoSegundoBimestre.Petshop.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    List<Produto> findByNomeProduto(String nomeProduto);

}
