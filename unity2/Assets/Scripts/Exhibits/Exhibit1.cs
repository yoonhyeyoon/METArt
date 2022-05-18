public class Exhibit1 : Exhibit
{
    void Start()
    {   
        exhibitId = 1;

        GetInfo();

        m_MinRotate = -180;
        m_MaxRotate = 180;

        m_TopRigHeight = 15f;
        m_MidRigHeight = 5f;

        m_minFOV = 5;
        m_maxFOV = 20;
    }
}