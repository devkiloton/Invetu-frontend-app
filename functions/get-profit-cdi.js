/* eslint-disable no-useless-escape */
const { default: axios } = require('axios');
const { onRequest } = require('firebase-functions/v2/https');

exports.getProfitCdi = onRequest(
  {
    region: 'southamerica-east1',
  },
  (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const startDate = new Date(Number(req.query.startDate))
      .toLocaleDateString('pt-BR')
      .split(',')[0];
    const endDate = new Date(Number(req.query.endDate))
      .toLocaleDateString('pt-BR')
      .split(',')[0];
    const amount = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
      .format(req.query.amount)
      .replace('R$', '')
      .replaceAll(/\s/g, '');
    const tax = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
      .format(req.query.tax)
      .replace('R$', '')
      .replaceAll(/\s/g, '');
    const bodyFormData = new FormData();
    bodyFormData.append('aba', 5);
    bodyFormData.append('dataInicial', startDate);
    bodyFormData.append('dataFinal', endDate);
    bodyFormData.append('valorCorrecao', amount);
    bodyFormData.append('percentualCorrecao', tax);

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://www3.bcb.gov.br/CALCIDADAO/publico/corrigirPeloCDI.do?method=corrigirPeloCDI',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: bodyFormData,
    };

    axios
      .request(config)
      .then(response => {
        const htmlString = response.data;
        const firstSplit = htmlString.split(
          'corre&ccedil;&atilde;o no per&iacute;odo</td>',
        )[1];
        const secondSplit = firstSplit.split('</tr>')[0];
        const thirdSplit = secondSplit.split('>')[1];
        const fourthSplit = thirdSplit.split('<')[0];
        const formatted = fourthSplit.replace(',', '.');

        res.send(formatted);
      })
      .catch(error => {
        console.log(error);
      });
  },
);
