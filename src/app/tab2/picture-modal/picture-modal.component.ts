import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';
import { ResultPageComponent } from '../result-page/result-page.component';


@Component({
  selector: 'app-picture-modal',
  templateUrl: './picture-modal.component.html',
  styleUrls: ['./picture-modal.component.scss'],
})
export class PictureModalComponent implements OnInit {
  imageTaken: any;
  resultJson;
  constructor(public modalController: ModalController, private camera: Camera,
    public router: Router) {

  }

  ngOnInit() {
    console.log('it came in');
  }

  closeModal() {
    this.modalController.dismiss();
    this.router.navigateByUrl('/tabs/tabs/tab1');
  }


  async myDismiss() {
    await this.modalController.dismiss(true);
  }


  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: 1,
    };

    this.camera.getPicture(options).then((imageData) => {
      console.log(imageData);
      this.imageTaken = 'data:image/jpeg;base64,' + imageData;
      this.resultJson = {
        web_entities_length: 10, Gingivitis: 0.7300000190734863,
        Gums: 0.7267000079154968, Dentistry: 0.6507999897003174,
        Periodontal_disease: 0.6338000297546387, Swollen_gums: 0.6241999864578247,
        Bleeding_on_probing: 0.6205999851226807,
        Acute_necrotizing_ulcerative_gingivitis: 0.585099995136261,
        Disease: 0.5802000164985657, Oral_mucosa: 0.5357999801635742,
        Gingival_recession: 0.5343000292778015
      };
      this.presentResultsModal();

    }, (error) => {
      console.log('camera issue');
      this.imageTaken = 'data:image/jpeg;base64,' + 'imageData';
      this.resultJson = {
        web_entities_length: 10, Gingivitis: 0.7300000190734863,
        Gums: 0.7267000079154968, Dentistry: 0.6507999897003174,
        Periodontal_disease: 0.6338000297546387, Swollen_gums: 0.6241999864578247,
        Bleeding_on_probing: 0.6205999851226807,
        Acute_necrotizing_ulcerative_gingivitis: 0.585099995136261,
        Disease: 0.5802000164985657, Oral_mucosa: 0.5357999801635742,
        Gingival_recession: 0.5343000292778015
      };
      this.presentResultsModal();
    });
  }

  async presentResultsModal() {
    const modal: HTMLIonModalElement =
      await this.modalController.create({
        component: ResultPageComponent,
        animated: true,
        componentProps: {
          imageSrc: this.imageTaken,
          resultSet: this.resultJson
        }
      });

    modal.onDidDismiss().then((detail) => {
    });

    await modal.present();
  }

}
