import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { FooterComponent } from './footer/footer.component';
import { YoutubePlayerComponent } from './youtube-player/youtube-player.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [FooterComponent, YoutubePlayerComponent, SpinnerComponent],
  imports: [CommonModule, YouTubePlayerModule],
  exports: [FooterComponent, YoutubePlayerComponent, SpinnerComponent],
})
export class SharedModule {}
