package com.ProjetoSegundoBimestre.Petshop.dto;

import com.ProjetoSegundoBimestre.Petshop.model.Categoria;

public record DadosAtualizarProduto(
        Long id,
        String foto,
        String nomeProduto,
        String descricaoProduto,
        double preco,
        String vendedor,
        Categoria categoria,
        int quantidade,
        String marca
) {
}
