import inquirer from "inquirer"
import Vertice from "../01/questao1"

class Triangulo {
    #vertice1
    #vertice2
    #vertice3
    
    constructor(vertice1, vertice2, vertice3){

        
        if(!vertice1 instanceof Vertice && vertice2 instanceof Vertice && vertice3 instanceof Vertice){
            console.log("os tres vertices devem ser instancias da classe vertice")
        }

        this.#vertice1
        this.#vertice2
        this.#vertice3
    }

    getVertice1(){
        return this.#vertice1
    }
    getVertice2(){
        return this.#vertice2
    }
    getVertice3(){
        return this.#vertice3
    }

    verificaTriangulo(lado1, lado2, lado3){
        const lado1 = this.#vertice1    
        const lado2 = this.#vertice2    
        const lado3 = this.#vertice3    
        if(!lado1 + lado2 > lado3 && lado2 + lado3 > lado1 && lado3 + lado1 > lado2 ){
            console.log("os vertices devem formar um triangulo")
        }
    }

    criaTriangulo(){
        inquirer.prompt([{
            type: "input",
            name: "vertx1",
            message: "digite o vertice x do primeiro lado do triangulo: "
        },{
            type: "input",
            name: "verty1",
            message: "digite o vertice y do primeiro lado do triangulo: "
        },
        {
            type: "input",
            name: "vertx2",
            message: "digite o vertice x do segundo lado do triangulo: "
        },
        {
            type: "input",
            name: "verty2",
            message: "digite o vertice y do segundo lado do triangulo: "
        },        
        {
            type: "input",
            name: "vertx3",
            message: "digite o vertice y do terceiro lado do triangulo: "
        },        
        {
            type: "input",
            name: "verty3",
            message: "digite o vertice y do terceiro lado do triangulo: "
        }, ]).then((answers)=>{
            const triangulo1 = new Triangulo(Number(answers.vertx1), Number(answers.verty1))
            const triangulo2 = new Triangulo(Number(answers.vertx2), Number(answers.verty2))
            const triangulo3 = new Triangulo(Number(answers.vertx3), Number(answers.verty3))

            console.log(`${triangulo1.getVertice1}`)
        })
    }
}

criaTriangulo()