package com.ProjetoSegundoBimestre.Petshop.controller;


import com.ProjetoSegundoBimestre.Petshop.dto.DadosCadastroProduto;
import com.ProjetoSegundoBimestre.Petshop.model.Produto;
import com.ProjetoSegundoBimestre.Petshop.repository.ProdutoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RequestMapping("/produto")
@RestController

public class controllerProduto {

    @Autowired
    private ProdutoRepository produtoRepository;

    @PostMapping
    @Transactional
    public void cadastrarProduto(@RequestBody DadosCadastroProduto dados) {
        produtoRepository.save(new Produto(dados));
    }


    @GetMapping
    public List<Produto> listarProdutos(){
        return produtoRepository.findAll();
    }


    @DeleteMapping("/{id}")
    @Transactional
    public void deletaProduto(@PathVariable Long id) {
        produtoRepository.deleteById(id);
    }

}
