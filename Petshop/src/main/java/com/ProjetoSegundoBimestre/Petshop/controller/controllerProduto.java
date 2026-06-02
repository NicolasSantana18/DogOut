package com.ProjetoSegundoBimestre.Petshop.controller;


import com.ProjetoSegundoBimestre.Petshop.dto.DadosAtualizarProduto;
import com.ProjetoSegundoBimestre.Petshop.dto.DadosCadastroProduto;
import com.ProjetoSegundoBimestre.Petshop.model.Categoria;
import com.ProjetoSegundoBimestre.Petshop.model.Produto;
import com.ProjetoSegundoBimestre.Petshop.repository.ProdutoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
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


    @GetMapping("/categoria/{categoria}")
    public List<Produto> listarProdutosPorCategoria(@PathVariable Categoria categoria){
        return produtoRepository.findByCategoria(categoria);
    }

    //aplicarDesconto
    //@GetMapping("/{id}")
    //public Double listarProdutosPorCategoria(@PathVariable Long id){
    //    var produto = produtoRepository.getReferenceById(id);
    //    return produto.getPreco() * 0.9;
    //}


    @PutMapping
    @Transactional
    public void atualizarProduto(@RequestBody DadosAtualizarProduto novosDados) {
        var produto = produtoRepository.getReferenceById(novosDados.id());
        produto.atualizarProduto(novosDados);
        System.out.println(produto.toString());

    }


    @DeleteMapping("/{id}")
    @Transactional
    public void deletaProduto(@PathVariable Long id) {
        produtoRepository.deleteById(id);
    }




}
