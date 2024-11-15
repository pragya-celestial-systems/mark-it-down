import React from "react";
import styles from "./css/documentation.module.css";
import MUIBreadCrumbs from "../components/MUIBreadCrumbs";

function DocumentationPage() {
  return (
    <div id={styles.container}>
      <MUIBreadCrumbs page="Documentation & Help" />
      <h1>Documentation & Help</h1>
      <hr className={styles.horizontal_line} />
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dignissim
        auctor metus nec hendrerit. Aenean magna est, vestibulum nec mollis eu,
        bibendum at lectus. Integer mi nisi, bibendum eget aliquam vel, iaculis
        a ex. Maecenas lectus dolor, ullamcorper id commodo ullamcorper, sodales
        at lacus. Suspendisse et dolor et erat dapibus congue. Sed laoreet
        mauris placerat aliquam sagittis. Pellentesque feugiat aliquam ligula
        sagittis semper. Curabitur sit amet vestibulum magna, condimentum auctor
        eros. Fusce accumsan dolor id tortor ultrices, eu placerat mi maximus.
        Sed pretium tellus in erat mattis, in convallis metus laoreet. Quisque
        semper at urna vestibulum commodo. Nullam quam velit, efficitur eget
        lectus quis, tempor varius orci. Pellentesque at lacinia justo, et
        faucibus augue. Aliquam diam dolor, vestibulum quis ex a, fermentum
        pulvinar velit. Cras lobortis velit eu augue ultricies commodo.
      </p>
      <p className={styles.desc}>
        Vivamus non pharetra erat. Vestibulum pharetra quis metus quis
        tristique. Cras hendrerit, dui et sodales fermentum, nibh quam posuere
        quam, a interdum ipsum tellus non neque. Cras imperdiet dui nibh. Aenean
        mattis erat at nulla scelerisque, a congue justo tristique. Sed placerat
        gravida rutrum. Duis ac magna facilisis, dapibus metus vel, lobortis
        lorem. Aliquam vestibulum dignissim mattis. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Vivamus ullamcorper elementum mauris eu
        porta. Nam pulvinar tristique est, non vulputate mi convallis ut. Donec
        quis metus ultrices lacus ornare scelerisque id vel nulla. Maecenas
        dictum sed elit eget dignissim. Morbi lacinia pellentesque nisi eget
        sollicitudin.
      </p>
      <hr className={styles.horizontal_line} />
      <p className={styles.desc}>
        Nam commodo malesuada mattis. Etiam convallis orci at feugiat pretium.
        Orci varius natoque penatibus et magnis dis parturient montes, nascetur
        ridiculus mus. Nulla ac elit eget erat maximus varius. Sed dapibus sit
        amet purus commodo semper. Duis quis turpis nec eros sodales pharetra ut
        sed enim. Nunc mattis orci at elit consequat finibus. In risus ligula,
        ultrices quis egestas eu, maximus quis sapien. Etiam eu sapien sit amet
        sapien blandit fermentum. In odio augue, malesuada in velit id, auctor
        vestibulum purus. Proin ultrices urna turpis, ut tristique sapien
        pharetra vitae. In sagittis eros felis, et facilisis mi fringilla at.
        Maecenas eget gravida ex. Praesent tempor commodo ligula in malesuada.
      </p>
      <p className={styles.desc}>
        Pellentesque ac interdum elit. Proin dapibus ante vestibulum aliquet
        euismod. Duis leo massa, vestibulum a metus ut, pellentesque ornare
        purus. Donec a consequat sapien. Donec quis eleifend nulla. Ut sed nisl
        dapibus, hendrerit ligula nec, vestibulum libero. Donec lacinia lectus
        non facilisis sagittis.
      </p>
      <p className={styles.desc}>
        Nunc auctor erat nec leo mollis vehicula. In accumsan nisl ac
        consectetur sodales. Quisque auctor risus sed congue sodales. Phasellus
        finibus magna sit amet lobortis elementum. Curabitur eu iaculis lectus.
        Donec sit amet est lectus. Quisque in nunc ac lorem tempus malesuada
        euismod eu sem. Morbi eu varius neque. Sed maximus cursus nunc in
        faucibus. Sed sed leo sodales, maximus mi at, congue turpis. Mauris
        finibus purus dolor, nec placerat dolor pretium sit amet. Sed egestas
        dapibus gravida. Nulla ut dui sollicitudin, lobortis risus vitae,
        vestibulum sapien. Praesent ut malesuada ipsum. Sed a ante at lorem
        venenatis pulvinar vel quis dolor.
      </p>
    </div>
  );
}

export default DocumentationPage;
