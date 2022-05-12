using Cinemachine;
using System;
using UnityEngine;

public class CameraManager : Singleton<CameraManager>
{
    public Camera MainCamera;
    public CinemachineBrain mainChine;
    public GalleryCam GalleryCam;
    public CinemachineVirtualCamera PlayerCamera;
    
    public void InitPlayerVirtualCamera(Transform transform)
    {
        PlayerCamera.Follow = transform;
        PlayerCamera.LookAt = transform;
    }

    public void ActivateGalleryCam()
    {
        GalleryCam.Activate();
    }

    public void DeactivateGalleryCam()
    {
        GalleryCam.Deactivate();
    }

    public void SetGalleryFreeLockCam(Gallery gallery)
    {
        GalleryCam.SetGalleryCam(gallery);
    }

    public void HidePlayerLayer()
    {
        MainCamera.cullingMask = MainCamera.cullingMask & ~(1 << LayerMask.NameToLayer("Player"));
    }

    public void HideGlassLayer()
    {
        MainCamera.cullingMask = MainCamera.cullingMask & ~(1 << LayerMask.NameToLayer("Glass"));
    }

    public void ShowPlayerLayer()
    {
        MainCamera.cullingMask |= 1 << LayerMask.NameToLayer("Player");
    }

    public void ShowGlassLayer()
    {
        MainCamera.cullingMask |= 1 << LayerMask.NameToLayer("Glass");
    }

    internal void ShowWallLayer()
    {
        MainCamera.cullingMask |= 1 << LayerMask.NameToLayer("Wall");
    }

    internal void HideWallLayer()
    {
        MainCamera.cullingMask = MainCamera.cullingMask & ~(1 << LayerMask.NameToLayer("Wall"));
    }
}
