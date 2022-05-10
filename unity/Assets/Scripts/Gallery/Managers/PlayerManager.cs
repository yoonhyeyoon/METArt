using System;
using System.Runtime.InteropServices;
using UnityEngine;

public class PlayerManager : Singleton<PlayerManager>
{
    public GameObject Player { get; set; }
    public bool IsActivePlayer { get; set; }
    public bool IsInGalleryArea { get; set; }
    public Gallery m_CollisionObject { get; set; }
    public Guid guid;
    
    private void Update() {
        if (GalleryManager.Instance.IsActive == false) return;

        if (IsInGalleryArea) {
            if (IsActivePlayer) {
                if (Input.GetKeyUp(KeyCode.E))
                {
                    if (m_CollisionObject.CompareTag("Gallery")) StartViewGallery();
                }
                if (Input.GetKeyUp(KeyCode.Q))
                {
                    if (m_CollisionObject.CompareTag("Gallery")) OpenGalleryInfo();
                }
                if (Input.GetKeyUp(KeyCode.R))
                {

                }
            }
            else
            {
                if (Input.GetKeyUp(KeyCode.X) )
                {
                    if (m_CollisionObject.CompareTag("Gallery"))
                        StopViewGallery();
                }
                if (Input.GetKeyUp(KeyCode.Escape))
                {
                }
            }
        }
    }

    void StartViewGallery()
    {
        m_CollisionObject.StopBlink();
        DeactivatePlayer();
        HideGlass();
        HidePlayer();
        HideWall();
        string HelpText = "마우스 휠 : 화면 축소/확대\n마우스 드래그 : 화면 회전\nX : 전시물 그만 보기";
        CanvasManager.Instance.SetHelpText(HelpText);
        CameraManager.Instance.ActivateGalleryCam(); // 전시물 시점 카메라 활성화 
    }

    void StopViewGallery()
    {
        m_CollisionObject.StartBlink();
        ActivatePlayer();
        ShowGlass();
        ShowPlayer();
        ShowWall();
        string HelpText = "E : 전시물 보기\nQ : 전시물 정보";
        CanvasManager.Instance.SetHelpText(HelpText);
        CameraManager.Instance.DeactivateGalleryCam();
    }

    void OpenGalleryInfo()
    {
        DeactivatePlayer();
        m_CollisionObject.StopBlink();
        CanvasManager.Instance.CloseHelpText();
        CanvasManager.Instance.OpenGalleryContentBoard(); 
    }

    public void CloseGalleryInfo()
    {
        ActivatePlayer();
        m_CollisionObject.StartBlink();
        CanvasManager.Instance.CloseGalleryInfo();
        CanvasManager.Instance.OpenHelpText(); ;
    }

    public void EnterInGalleryArea(Gallery CollisionGallery)
    {
        m_CollisionObject = CollisionGallery;
        m_CollisionObject.StartBlink();
        IsInGalleryArea = true;

        CanvasManager.Instance.OpenHelpText();
        GalleryVO.galleryName = m_CollisionObject.galleryName;
        GalleryVO.galleryId = m_CollisionObject.galleryId;
    }

    public void ExitInGalleryArea()
    {
        m_CollisionObject.StopBlink();
        IsInGalleryArea = false;
        CanvasManager.Instance.OpenHelpText();
    }
    public void ShowGlass()
    {
        CameraManager.Instance.ShowGlassLayer();
    }
    public void HideGlass()
    {
        CameraManager.Instance.HideGlassLayer();
    }
    public void ShowPlayer()
    {
        CameraManager.Instance.ShowPlayerLayer();
    }
    public void HidePlayer()
    {
        CameraManager.Instance.HidePlayerLayer();
    }
    public void ShowWall()
    {
        CameraManager.Instance.ShowWallLayer();
    }
    public void HideWall()
    {
        CameraManager.Instance.HideWallLayer();
    }
    public void ActivatePlayer()
    {
        IsActivePlayer = true;
    }
    public void DeactivatePlayer()
    {
        IsActivePlayer = false;
    }
}
