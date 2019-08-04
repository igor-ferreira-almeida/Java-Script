
import {View} from "./View";
import {DateHelper} from "../helpers/DateHelper";
import {currentInstance} from "../controllers/NegociacaoController";

export class NegociacaoView extends View {

  constructor(elemento) {
    super(elemento);
    elemento.addEventListener("click", function(event) {
      if(event.target.nodeName == "TH") {
        currentInstance().ordena(event.target.textContent.toLowerCase());
      }
    });

  }

  template(model) {
    return `
      <table class="table table-hover table-bordered">
          <thead>
              <tr>
                  <th class="order-column">DATA</th>
                  <th class="order-column">QUANTIDADE</th>
                  <th class="order-column">VALOR</th>
                  <th class="order-column">VOLUME</th>
              </tr>
          </thead>

          <tbody>

            ${model.negociacoes.map(n => {
              return `<tr>
                  <td>${DateHelper.dataParaTexto(n.data)}</td>
                  <td>${n.quantidade}</td>
                  <td>${n.valor}</td>
                  <td>${n.volume}</td>
                </tr>
              `
            }).join("")}

          </tbody>

          <tfoot>
            <tr>
              <td colspan="3"></td>
              <td>${model.volumeTotal}</td>
            </tr>
          </tfoot>
      </table>
    `;
  }
}
