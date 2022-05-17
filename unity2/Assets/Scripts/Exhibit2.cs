public class Exhibit2 : Exhibit
{
    void Start()
    {
        exhibitId = 999999;
        exhibitName = "test 5.2";
        year = "1976";
        producer = "Shugart Technology";
        content = "3.5인치 디스켓이 만들어지기 전까지 많은 사람들이 사용하였던 제품이다.";

        m_MinRotate = -180;
        m_MaxRotate = 180;

        m_TopRigHeight = 15f;
        m_MidRigHeight = 5f;

        m_minFOV = 5;
        m_maxFOV = 20;
    }
}