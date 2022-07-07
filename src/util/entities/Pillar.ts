import * as PIXI from 'pixi.js';
import { GameObject } from './GameObject';
import { pageModalStore } from '$lib/PageModalStore';

export class Pillar extends GameObject {

    public page: any;
    public found: boolean = false;

    constructor(config: any) {
        super(config);
        this.page = config.page || { component: 'About' };

        // Handle Interaction
        this.containerGameObject.interactive = true;
        this.containerGameObject.on('pointerover', () => { this.onPointerOver(); });
        this.containerGameObject.on('pointerout', () => { this.onPointerOut(); });
        this.containerGameObject.on('pointerdown', () => { this.onPointerDown(); });
    }

    animSpriteSettiongs(): void {
        this.animSprite.animationSpeed = 0.2;
        this.animSprite.width = this.grid.unit(3);
        this.animSprite.height = this.grid.unit(6);
    }

    onPointerOver(): void {
        let filterEffect: any = new PIXI.filters.ColorMatrixFilter();
            filterEffect.brightness(1.3, false);
        this.containerGameObject.filters = [filterEffect];
    }
    
    onPointerOut(): void {
        this.containerGameObject.filters = [];
    }

    onPointerDown(): void {
        this.camera.centerOnTarget(this);
        pageModalStore.set(this.page);
        // Set Found state
        this.found = true;
        this.animSprite.play();
    }

    render(): void {}

}