package com.ProjetoSegundoBimestre.Petshop.model;


import com.ProjetoSegundoBimestre.Petshop.dto.DadosAtualizarProduto;
import com.ProjetoSegundoBimestre.Petshop.dto.DadosCadastroProduto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "produto")
@Entity(name = "Produto")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Produto {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String foto;
    private String nomeProduto;
    private String descricaoProduto;
    private double preco;
    private String vendedor;
    @Enumerated(EnumType.STRING)
    private Categoria categoria;
    private int quantidade;
    private String marca;


    public Produto(DadosCadastroProduto dados) {
        this.foto = dados.foto();
        this.nomeProduto = dados.nomeProduto();
        this.descricaoProduto = dados.descricaoProduto();
        this.preco = dados.preco();
        this.vendedor = dados.vendedor();
        this.categoria = dados.categoria();
        this.quantidade = dados.quantidade();
        this.marca = dados.marca();
    }


    public void atualizarProduto(DadosAtualizarProduto novosDados) {
        this.foto = novosDados.foto();
        this.nomeProduto = novosDados.nomeProduto();
        this.descricaoProduto = novosDados.descricaoProduto() ;
        this.preco = novosDados.preco();
        this.vendedor = novosDados.vendedor();
        this.categoria = novosDados.categoria();
        this.quantidade = novosDados.quantidade();
        this.marca = novosDados.marca();
    }

}
