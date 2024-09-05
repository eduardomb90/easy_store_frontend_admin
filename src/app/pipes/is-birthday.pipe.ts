import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isBirthday',
  pure: true
})
export class IsBirthdayPipe implements PipeTransform {
  transform(dataNasc: string): boolean {
    if (!dataNasc) return false;

    // Extrai o mês e o dia da data de nascimento
    const [year, month, day] = dataNasc.split('-');
    const dataAniversario = { day: Number(day), month: Number(month) };

    // Obter a data atual
    const hoje = new Date();
    const hojeDia = hoje.getDate();
    const hojeMes = hoje.getMonth() + 1; // +1 porque getMonth() é baseado em zero

    // Comparar o dia e o mês
    const ehAniversario = dataAniversario.day === hojeDia && dataAniversario.month === hojeMes;

    return ehAniversario;
  }
}
