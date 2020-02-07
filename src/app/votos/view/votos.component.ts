import {Component, OnInit} from '@angular/core';
import {VotosService} from '../service/votos.service';
import {log} from 'util';
import {GraficoDto} from '../model/GraficoDto';

@Component({
  selector: 'app-votos',
  styleUrls: ['./votos.component.scss'],
  templateUrl: './votos.component.html'
})
export class VotosComponent implements OnInit {

  data: any;
  options: any;

  constructor(
    private votosService: VotosService
  ) {

  }

  ngOnInit(): void {

    this.votosService.consultarVotacaoGrafico().then(
      value => {
        this.montarGrafico(value);
      },
      error => {
        console.log(error);
      }
    );

    this.options = {
      title: {
        display: true,
        text: 'Quantidade total de votos',
        fontSize: 22
      },
      legend: {
        position: 'bottom'
      }
    };
  }

  montarGrafico(graficoDto: GraficoDto[]) {
    this.data = {
      labels: [
        graficoDto[0].nomeEempreendimento,
        graficoDto[1].nomeEempreendimento,
        graficoDto[2].nomeEempreendimento
      ],
      datasets: [
        {
          data: [
            graficoDto[0].votos,
            graficoDto[1].votos,
            graficoDto[2].votos
          ],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ]
        }]
    };
  }

}
