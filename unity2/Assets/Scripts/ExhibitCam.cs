using Cinemachine;
using UnityEngine;
public class ExhibitCam : MonoBehaviour
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

    CinemachineFreeLook exhibitFreeLockCam;

    [Range(0, 360)]
    public float deadZoneSize = 60;

    private void Start()
    {
        IsActive = false;
        exhibitFreeLockCam = GetComponent<CinemachineFreeLook>();
    } 

    void Update()
    {
        if (IsActive)
        { 
            if (Input.GetMouseButtonDown(0))
            {
                exhibitFreeLockCam.m_XAxis.m_MaxSpeed = 300;
                exhibitFreeLockCam.m_YAxis.m_MaxSpeed = 5;
            }

            else if (Input.GetMouseButtonUp(0))
            {
                exhibitFreeLockCam.m_XAxis.m_MaxSpeed = 0;
                exhibitFreeLockCam.m_YAxis.m_MaxSpeed = 0;
            }

            float scroll = Input.GetAxis("Mouse ScrollWheel");
            if (scroll < 0) { 
                if (exhibitFreeLockCam.m_Lens.FieldOfView >= m_maxFOV)
                {
                    return;
                }
                exhibitFreeLockCam.m_Lens.FieldOfView += 2;
            }
            else if (scroll > 0) {
                if (exhibitFreeLockCam.m_Lens.FieldOfView <= m_minFOV)
                {
                    return;
                }
                exhibitFreeLockCam.m_Lens.FieldOfView -= 2;
            }
        } 
    }
    public void Activate()
    {
        IsActive = true;
        exhibitFreeLockCam.m_Priority = 2;
    }
    public void Deactivate()
    {
        IsActive = false;
        exhibitFreeLockCam.m_Priority = 0;
    }
    public void SetExhibitCam(Exhibit exhibit)
    {
        exhibitFreeLockCam.Follow = exhibit.GetCenter();
        exhibitFreeLockCam.LookAt = exhibit.GetCenter();
        exhibitFreeLockCam.m_Orbits[0].m_Height = exhibit.m_TopRigHeight;
        exhibitFreeLockCam.m_Orbits[1].m_Height = exhibit.m_MidRigHeight;
        exhibitFreeLockCam.m_Orbits[2].m_Height = exhibit.m_MidRigHeight;
        exhibitFreeLockCam.m_XAxis.m_MinValue = exhibit.m_MinRotate;
        exhibitFreeLockCam.m_XAxis.m_MaxValue = exhibit.m_MaxRotate;
        m_minFOV = exhibit.m_minFOV;
        m_maxFOV = exhibit.m_maxFOV;

        exhibitFreeLockCam.m_Lens.FieldOfView = (m_minFOV + m_maxFOV) / 2;
        

    }
}
