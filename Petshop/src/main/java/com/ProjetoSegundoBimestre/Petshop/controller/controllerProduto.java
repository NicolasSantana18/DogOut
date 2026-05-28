package com.ProjetoSegundoBimestre.Petshop.controller;


import com.ProjetoSegundoBimestre.Petshop.dto.DadosCadastroProduto;
import com.ProjetoSegundoBimestre.Petshop.model.Produto;
import com.ProjetoSegundoBimestre.Petshop.repository.ProdutoRepository;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RequestMapping("produto")
@RestController

public class controllerProduto {

    private ProdutoRepository produtoRepository;

    @PostMapping
    public void CadastrarProduto(@RequestBody DadosCadastroProduto dados) {
        produtoRepository.save(new Produto(dados));
    }
}
