public class Exhibit7 : Exhibit
{
    void Start()
    {
        exhibitId = 9;
        exhibitName = "FloppyDisk 5.2";
        year = "1976";
        producer = "Shugart Technology";
        content = "7";

        m_MinRotate = -180;
        m_MaxRotate = 180;

        m_TopRigHeight = 15f;
        m_MidRigHeight = 5f;

        m_minFOV = 5;
        m_maxFOV = 20;
    }
}