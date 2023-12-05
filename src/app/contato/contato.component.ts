import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contato } from '../models/contato';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent {

  contato: Contato = { nome: '', email: '' };

  nomeToDelete: string = '';
  emailToDelete: string = '';

  nomeBusca: string = '';
  contatos: any[] = [];

  constructor(private contactService: ContactService) {}

  salvarContato() {
    this.contactService.salvarContato(this.contato).subscribe(
      (data) => {
        console.log('Contato salvo com sucesso:', data);
        // Adicione qualquer lógica adicional aqui, se necessário
      },
      (error) => {
        console.error('Erro ao salvar contato:', error);
        // Trate os erros conforme necessário
      }
    );
  }

  deleteContato(): void {
    const parametroDelecao = { nome: this.nomeToDelete, email: this.emailToDelete };

    this.contactService.deleteContact(parametroDelecao).subscribe(
      () => {
        console.log(`Contato deletado com sucesso.`);
        // Adicione lógica adicional se necessário
      },
      (error) => {
        console.error('Erro ao deletar contato:', error);
        // Trate os erros conforme necessário
      }
    );
  }


  buscarContatosPorNome() {
    this.contactService.getContactsByName(this.nomeBusca).subscribe(
      (data) => {
        this.contatos = data;
      },
      (error) => {
        console.error('Erro ao buscar contatos por nome:', error);
      }
    );
  }
}
