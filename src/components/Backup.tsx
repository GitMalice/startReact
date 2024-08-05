import React from "react";
import LVMsc from "../assets/backup/Capture-LVM.png";

const Backup = () => {
  return (
    <div>
      <h2 className="etape">Gestion du stockage + sauvegardes automatisées</h2>
      <p>
        Pour sécuriser notre infrastructure, il est important de réaliser des
        sauvegardes régulières et de les stocker sur une machine distante. Nous
        avons un serveur dédié à cette tâche, qui reçoit une copie de notre
        serveur web.
      </p>
      <p>
        Dans notre scénario, nous partons d'une machine de backup qui reçoit les
        données bientôt saturée. Le serveur gérant un important stock de
        données, on va pouvoir agrandir sa capacité grâce aux possibilités du
        LVM.
      </p>
      <h4 className="sous-titre">Gestion du stockage via LVM</h4>
      <p>
        On ajoute d'abord un espace de stockage sur notre machine, via
        l'hyperviser (un disque dur de 10Go).
      </p>
      <p>
        Pour visualiser les espaces de stockage disponibles, on utilise la
        commande :
      </p>
      <p className="code">lsblk</p>
      <p>Premièrement, on crée une partition sur cet espace :</p>
      <p className="code">fdisk /dev/vdb</p>
      <p className="code_expl">
        en options pour la création :<br />
        <b>n</b> pour créer un nouveau volume
        <br />
        <b>p</b> pour créer un volume primaire
        <br />
        on entre ensuite un numéro de partition
        <br />
        on sélectionne les secteurs par défaut, sauf dimensions spécifiques
        <br />
        <b>w</b> pour sauver
      </p>
      <p>On crée un Volume Group nommé myvg :</p>
      <p className="code">sudo vgcreate myvg /dev/vdb1</p>
      <p>
        Pour vérifier qu'il est bien créé, on peut visualiser les VG existants
        avec :
      </p>
      <p className="code">sudo vgs</p>
      <p>
        Pour travailler sur un volume flexible, on ajoute un Logical Volume,
        mylv, avec la commande :
      </p>
      <p className="code">lvcreate -L 10G -n mylv myvg</p>
      <p>Pour afficher les détails du volume créé, on utilise :</p>
      <p className="code">lvdisplay myvg</p>
      <div className="screenshot">
        <img className="sc-img" src={LVMsc} alt="code de déploiement apache" />
      </div>
      <p>
        On formate ensuite le nouveau volume avec le file system ext4 avec :
      </p>
      <p className="code">mkfs.ext4 /dev/myvg/mylv</p>
      <p>
        On monte le volume pour le rendre accessible comme un répertoire : (ici,
        on y accède sur /backup/)
      </p>
      <p className="code">
        mkdir /backup
        <br />
        mount /dev/myvg/mylv /backup
      </p>
      <p>Le disque est prêt à être utilisé</p>
      <p>
        On arrive ensuite à notre partie du scénario ou le stockage serait sur
        le point d'être saturé, et on souhaite l'étendre avec un disque
        additionnel.
      </p>
      <h5 className="sous-titre">Ajout d'un nouveau disque dur</h5>
      <p>
        On ajoute un nouvel espace de stockage sur la machine, puis on crée la
        partition :
      </p>
      <p className="code">fdisk /dev/vdc</p>
      <p className="code_expl">
        de nouveau, <b>n</b> pour nouveau, <b>p</b> pour partition primaire, la
        taille par défaut, et <b>w</b> pour sauver.
      </p>
      <p>On crée le Physical Volume avec :</p>
      <p className="code">sudo pvcreate /dev/vdc1</p>
      <p>
        Cette fois-ci on étend le Volume Group existant pour englober le nouveau
        PV créé :
      </p>
      <p className="code">sudo vgextend myvg /dev/vdc1</p>
      <p>Et pour vérifier que l'installation est fonctionnelle :</p>
      <p className="code">sudo vgs</p>
      <p>
        Nous avons bien maintenant 15Go d'espace de disponible, ce qui
        correspond bien au premier disque et celui de 5 Go ajouté ensuite.
        SUCCESS !!!
      </p>
    </div>
  );
};

export default Backup;
