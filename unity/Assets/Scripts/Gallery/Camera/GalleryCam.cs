using Cinemachine;
using UnityEngine;

public class GalleryCam : MonoBehaviour
{
    private int m_minFOV;
    private int m_maxFOV;

    private bool isActive;

    public bool IsActive
    {
        get { return isActive; }
        set { isActive = value; }
    }

    public float topRigHeight;

    CinemachineFreeLook galleryFreeLockCam;

    [Range(0, 360)]
    public float deadZoneSize = 60;

    private void Start()
    {
        IsActive = false;
        galleryFreeLockCam = GetComponent<CinemachineFreeLook>();
    } 

    void Update()
    {
        if (IsActive)
        { 
            if (Input.GetMouseButtonDown(0))
            {
                galleryFreeLockCam.m_XAxis.m_MaxSpeed = 300;
                galleryFreeLockCam.m_YAxis.m_MaxSpeed = 5;
            }

            else if (Input.GetMouseButtonUp(0))
            {
                galleryFreeLockCam.m_XAxis.m_MaxSpeed = 0;
                galleryFreeLockCam.m_YAxis.m_MaxSpeed = 0;
            }

            float scroll = Input.GetAxis("Mouse ScrollWheel");
            if (scroll < 0) { 
                if (galleryFreeLockCam.m_Lens.FieldOfView >= m_maxFOV)
                {
                    return;
                }
                galleryFreeLockCam.m_Lens.FieldOfView += 2;
            }
            else if (scroll > 0) {
                if (galleryFreeLockCam.m_Lens.FieldOfView <= m_minFOV)
                {
                    return;
                }
                galleryFreeLockCam.m_Lens.FieldOfView -= 2;
            }
        } 
    }

    public void Activate()
    {
        IsActive = true;
        galleryFreeLockCam.m_Priority = 2;
    }

    public void Deactivate()
    {
        IsActive = false;
        galleryFreeLockCam.m_Priority = 0;
    }

    public void SetGalleryCam(Gallery gallery)
    {
        galleryFreeLockCam.Follow = gallery.GetCenter();
        galleryFreeLockCam.LookAt = gallery.GetCenter();
        galleryFreeLockCam.m_Orbits[0].m_Height = gallery.m_TopRigHeight;
        galleryFreeLockCam.m_Orbits[1].m_Height = gallery.m_MidRigHeight;
        galleryFreeLockCam.m_Orbits[2].m_Height = gallery.m_MidRigHeight;
        galleryFreeLockCam.m_XAxis.m_MinValue = gallery.m_MinRotate;
        galleryFreeLockCam.m_XAxis.m_MaxValue = gallery.m_MaxRotate;
        m_minFOV = gallery.m_minFOV;
        m_maxFOV = gallery.m_maxFOV;

        galleryFreeLockCam.m_Lens.FieldOfView = (m_minFOV + m_maxFOV) / 2;
    }
}
