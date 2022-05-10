using Photon.Pun;
using System.Runtime.InteropServices;
using TMPro;
using UnityEngine;

public class Player : MonoBehaviourPun
{
    [DllImport("__Internal")]
    private static extern void Mute(string guid);

    [DllImport("__Internal")]
    private static extern void Unmute(string guid);

    public PhotonView PV;
    public float speed;

    float hAxis;
    float vAxis;
    bool rDown;

    public TextMeshPro NickNameText;
    Vector3 moveVec;
    Animator animator;

    void Awake() {
        transform.localScale = new Vector3(1.5f, 1.5f, 1.5f);
        animator = GetComponentInChildren<Animator>();
        // NickNameText.text = PV.IsMine ? PhotonNetwork.NickName : PV.Owner.NickName;
        NickNameText.text = "Guest";
        if (PV.IsMine) {
            PlayerManager.Instance.DeactivatePlayer();
            PlayerManager.Instance.Player = gameObject;
            PlayerManager.Instance.HidePlayer();
            Invoke("ActivePlayer", 2f);
        }
    }

    public void ActivePlayer() {
        PlayerManager.Instance.ShowPlayer();
        PlayerManager.Instance.ActivatePlayer();
        CameraManager.Instance.InitPlayerVirtualCamera(this.transform);
    }

    private void OnTriggerEnter(Collider other)
    {
        if (!PV.IsMine)
            return;

        GameObject galleryGameObject = other.gameObject;
        string tag = galleryGameObject.tag;
        string HelpText = null;
        Gallery CollisionGallery = galleryGameObject.GetComponent<Gallery>();
        switch (tag)
        {
            case "Gallery":
                HelpText = "E : 전시물 보기\nQ : 전시물 정보";
                PlayerManager.Instance.EnterInGalleryArea(CollisionGallery);
                CameraManager.Instance.SetGalleryFreeLockCam(CollisionGallery);
                CanvasManager.Instance.SetGalleryInfo(CollisionGallery);
                break;
        }
        if (HelpText != null)
            CanvasManager.Instance.SetHelpText(HelpText);
    }

    private void OnTriggerExit(Collider other)
    {
        if (!PV.IsMine)
            return;

        string tag = other.gameObject.tag;
        switch (tag)
        {
            case "Gallery":
                PlayerManager.Instance.ExitInGalleryArea();
                string HelpText = "방향키 : 이동\nL쉬프트 : 달리기";
                CanvasManager.Instance.SetHelpText(HelpText);
                break;
        }
    }

    void Update() {
        if (!PV.IsMine) return;
        ControllMove();
    }

    private void ControllMove() {
        if (!PlayerManager.Instance.IsActivePlayer) return;

        hAxis = Input.GetAxisRaw("Horizontal");
        vAxis = Input.GetAxisRaw("Vertical");
        rDown = Input.GetButton("Run");

        moveVec = new Vector3(hAxis, 0, vAxis).normalized;

        transform.position += moveVec * speed * Time.deltaTime * (rDown ? 1.5f : 1f);

        animator.SetBool("isWalk", moveVec != Vector3.zero);
        animator.SetBool("isRun", rDown);

        PV.RPC("Rotate", RpcTarget.All, moveVec);
    }

    [PunRPC]
    private void Rotate(Vector3 moveVec) {
        transform.LookAt(transform.position + moveVec);
        NickNameText.transform.rotation = CameraManager.Instance.PlayerCamera.transform.rotation;
    }
}
