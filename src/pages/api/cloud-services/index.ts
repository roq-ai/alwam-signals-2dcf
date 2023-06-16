import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { cloudServiceValidationSchema } from 'validationSchema/cloud-services';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getCloudServices();
    case 'POST':
      return createCloudService();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCloudServices() {
    const data = await prisma.cloud_service
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'cloud_service'));
    return res.status(200).json(data);
  }

  async function createCloudService() {
    await cloudServiceValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.customer_service?.length > 0) {
      const create_customer_service = body.customer_service;
      body.customer_service = {
        create: create_customer_service,
      };
    } else {
      delete body.customer_service;
    }
    const data = await prisma.cloud_service.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
