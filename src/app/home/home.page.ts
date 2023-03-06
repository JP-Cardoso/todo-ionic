import { Component } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tasks: any[] = []

  constructor(
    private alertControll: AlertController,
    private toastControll: ToastController,
    private actionSheet: ActionSheetController
  ) { 

    let taskJson:any = localStorage.getItem('task');   
   
    if(taskJson !== null) {
      this.tasks = JSON.parse(taskJson)
    }
  }

  async showAdd() {
    const alert = await this.alertControll.create({
      header: 'O que deseja fazer?',
      inputs: [
        {
          name: 'taskToDo',
          type: 'text',
          placeholder: 'Tarefa:'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            console.log('clicked cancel')
          }
        },
        {
          text: 'Adicionar',
          handler: (form) => {
            this.add(form.taskToDo);
          }
        }
      ]

    })

    await alert.present()
  }

  deleteDesk(task: any) {
    this.tasks = this.tasks.filter(taskArray => task != taskArray);
    this.updateLocalStorage()
  }

  async add(newTask: string) {

    if (!newTask) {
      const toast = await this.toastControll.create({
        message: 'Informe o que deseja fazer!',
        duration: 2000,
        position: 'top',
        cssClass: 'light'
      })
      await toast.present();
      return;
    }

    let task = {name: newTask, done: false};
    this.tasks.push(task);
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem('task', JSON.stringify(this.tasks));
  }

  async openActions(task: any) {
    const actionSheet = await this.actionSheet.create({
      header: 'O que deseja fazer?',
      buttons: [{
        text: task.done ? 'Desmacar' : 'Marcar',
        icon: task.done ? 'radio-button-off' : 'checkmark-circle',
        handler: () => {
          task.done = !task.done;
          this.updateLocalStorage()
        }
      }, 
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
          
        }
      }
    ]
    });
    await actionSheet.present()
  }


}
