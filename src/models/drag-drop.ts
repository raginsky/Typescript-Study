/** Drag&Drop Interface:
 * namespace will be compiled to object in the vanilla JS.
 * Anything can be added in namespace.
 */

namespace App {
    export interface Draggable {
        dragStartHandler(event: DragEvent): void;

        dragEndHandler(event: DragEvent): void;
    }

    export interface DragTarget {
        dragOverHandler(event: DragEvent): void;

        dropHandler(event: DragEvent): void;

        dragLeaveHandler(event: DragEvent): void;
    }
}
