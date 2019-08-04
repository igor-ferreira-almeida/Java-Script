
export class DateHelper {

  constructor() {
    throw new Error("DateHelper não pode ser instanciada");
  }

  static dataParaTexto(data) {

    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    //return data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();
  }

  static textoParaData(texto) {
    let regex = /^\d{4}-\d{2}-\d{2}$/;
    // let regex = /^\d{2}\/\d{2}\/\d{4}$/;

    if(!regex.test(texto)) {
      throw new Error("Deve estar no formato aaaa-mm-dd");
    }

    return new Date(...texto.split("-").map((item, index) => index == 1 ? item - 1 : item));
  }
}
